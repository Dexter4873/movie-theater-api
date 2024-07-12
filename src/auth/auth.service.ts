import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from './dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponse } from '../common/types/refresh-response';
import { SignInResponse } from '../common/types/sing-in-response';
import { JwtPayloadData } from '../common/types/jwt-payload-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Booker } from '../bookers/entities/booker.entity';
import { Repository } from 'typeorm';
import { JwtSecrets } from '../common/types/global-config.interface';

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    @InjectRepository(Booker) private readonly bookerRepo: Repository<Booker>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<JwtSecrets>('jwtSecrets').access;
    this.refreshSecret = this.configService.get<JwtSecrets>('jwtSecrets').refresh;
  }

  async signIn({ email, password }: SingInDto): Promise<SignInResponse> {
    // Check booker whit email exists
    const booker = await this.bookerRepo.findOne({
      where: { email },
      select: ['password', 'email']
    });
    if (!booker) throw new UnauthorizedException();

    // Validate password
    const validPassword = await compare(password, booker.password);
    if (!validPassword) throw new UnauthorizedException();

    // Create payload
    const payload: JwtPayloadData = {
      id: booker.id,
      email: booker.email,
    };

    // Sign the access token
    const access = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: this.accessSecret,
    });

    // Sign refresh token
    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: '4w',
      secret: this.refreshSecret,
    });

    return {
      access,
      refresh,
    };
  }

  async refresh({ refresh }: RefreshTokenDto): Promise<RefreshResponse> {
    try {
      // Validate refresh token
      const payload = await this.jwtService.verifyAsync(refresh, {
        secret: this.refreshSecret,
      });

      // Sign a new access token
      const access = await this.jwtService.signAsync(payload, {
        secret: this.accessSecret,
      });

      return { access };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
