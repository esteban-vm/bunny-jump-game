import Phaser from 'phaser'
import { Scenes, Textures, Sounds } from '@/keys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  preload() {
    this.load.image(Textures.Background, 'images/bg_layer1.png')
    this.load.image(Textures.Platform, 'images/ground_grass.png')
    this.load.image(Textures.BunnyStand, 'images/bunny1_stand.png')
    this.load.image(Textures.BunnyJump, 'images/bunny1_jump.png')
    this.load.image(Textures.Carrot, 'images/carrot.png')
    this.load.audio(Sounds.Jump, 'audios/phaseJump1.mp3')
  }

  create() {
    this.scene.start(Scenes.Game)
  }
}
