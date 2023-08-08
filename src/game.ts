import '@/game.css'
import Phaser from 'phaser'
import { End, Main, Preloader } from '@/scenes'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Preloader, Main, End],
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 200 }, debug: import.meta.env.DEV },
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
}

export default new Phaser.Game(config)
