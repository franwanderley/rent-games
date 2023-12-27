import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserGame } from 'src/user-game/entities/user-game.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmailKey(userGame: UserGame) {
    this.mailerService
      .sendMail({
        to: userGame.user.email,
        from: process.env.MAILDEV_INCOMING_USER,
        subject: `Chave do jogo ${userGame.game.name}`,
        text: `Olá ${userGame.user.name} aqui está o codigo do seu jogo: ${userGame.game.key}`,
      })
      .then(() => console.log('email enviado'))
      .catch((err) => console.log(err));
  }
}
