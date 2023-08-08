import Phaser from 'phaser'
import { Scenes, Sounds, Textures } from '@/constants'

const Preloader = class extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  public preload() {
    this.load.image([
      { key: Textures.Background, url: '/images/bg_layer1.png' },
      { key: Textures.Platform, url: '/images/ground_grass.png' },
      { key: Textures.BunnyStand, url: '/images/bunny1_stand.png' },
      { key: Textures.BunnyJump, url: '/images/bunny1_jump.png' },
      { key: Textures.BunnyHurt, url: '/images/bunny1_hurt.png' },
      { key: Textures.Carrot, url: '/images/carrot.png' },
    ])

    this.load.audio(Sounds.Jump, '/sounds/phaseJump1.mp3')
  }

  public create() {
    if (this.game.device.os.desktop) {
      this.scene.start(Scenes.Main)
    } else {
      const { width, height } = this.scale
      const text = 'This game is not currently supported in mobile devices :/'
      this.add.image(width / 2, height / 3, Textures.BunnyHurt).setScale(0.7)
      this.add.text(width / 2, height / 2, text, { fontSize: '12px' }).setOrigin(0.5)
    }
  }
}

export default Preloader
