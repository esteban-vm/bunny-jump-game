import Phaser from 'phaser'
import { Scenes, Textures } from '@/constants'

const End = class extends Phaser.Scene {
  constructor() {
    super(Scenes.End)
  }

  public create() {
    const { width, height } = this.scale
    const text1 = 'Game Over'
    const text2 = 'Press space to restart'
    this.add.image(width / 2, height / 3, Textures.BunnyHurt).setScale(0.7)
    this.add.text(width / 2, height / 2, text1, { fontSize: '48px' }).setOrigin(0.5)
    this.add.text(width / 2, (height * 2) / 3, text2, { fontSize: '32px' }).setOrigin(0.5)
    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start(Scenes.Main))
  }
}

export default End
