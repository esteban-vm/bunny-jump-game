import Phaser from 'phaser'
import { Scenes } from '@/constants'

const End = class extends Phaser.Scene {
  constructor() {
    super(Scenes.End)
  }

  public create() {
    this.add.text(this.scale.width / 2, this.scale.height / 2, 'Game Over', { fontSize: '48px' }).setOrigin(0.5)
    this.input.keyboard?.once('keydown-SPACE', this.restart)
    this.input.on('pointerdown', this.restart)
  }

  private restart = () => {
    this.scene.start(Scenes.Main)
  }
}

export default End
