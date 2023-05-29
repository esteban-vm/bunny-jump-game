import Phaser from 'phaser'
import { Scenes } from '@/keys'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super(Scenes.GameOver)
  }

  create() {
    const gameWidth = this.scale.width
    const gameHeight = this.scale.height
    this.add.text(gameWidth * 0.5, gameHeight * 0.5, 'Game Over', { fontSize: '48px' }).setOrigin(0.5)
    this.input.keyboard.once('keydown-SPACE', () => void this.scene.start(Scenes.Game))
  }
}
