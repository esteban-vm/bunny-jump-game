import '@/styles'
import Phaser from 'phaser'
import { Preloader, Game, GameOver } from '@/scenes'

const config: Phaser.Types.Core.GameConfig = {
  parent: 'app',
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Preloader, Game, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
      // debug: true,
    },
  },
}

export default new Phaser.Game(config)
