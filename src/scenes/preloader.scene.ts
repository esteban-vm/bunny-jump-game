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
      { key: Textures.Carrot, url: '/images/carrot.png' },
    ])

    this.load.audio(Sounds.Jump, '/sounds/phaseJump1.mp3')
  }

  public create() {
    this.scene.start(Scenes.Main)
  }
}

export default Preloader
