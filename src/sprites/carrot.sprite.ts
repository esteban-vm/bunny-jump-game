import Phaser from 'phaser'

export default class Carrot extends Phaser.Physics.Arcade.Sprite {
  constructor(...params: [scene: Phaser.Scene, x: number, y: number, texture: string]) {
    super(...params)
    this.setScale(0.5)
  }
}
