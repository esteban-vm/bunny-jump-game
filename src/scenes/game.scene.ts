import Phaser from 'phaser'
import { Scenes, Textures, Sounds } from '@/keys'
import { Carrot } from '@/sprites'

export default class Game extends Phaser.Scene {
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private bunny!: Phaser.Physics.Arcade.Sprite
  private carrots!: Phaser.Physics.Arcade.Group
  private keys!: Phaser.Types.Input.Keyboard.CursorKeys
  private carrotsCollected!: number
  private carrotsCollectedText!: Phaser.GameObjects.Text

  constructor() {
    super(Scenes.Game)
  }

  init() {
    this.carrotsCollected = 0
  }

  create() {
    this.add.image(240, 320, Textures.Background).setScrollFactor(1, 0)
    this.platforms = this.physics.add.staticGroup()

    for (let index = 0; index < 5; ++index) {
      const x = Phaser.Math.Between(80, 400)
      const y = 150 * index

      const platform = this.platforms.create(x, y, Textures.Platform) as Phaser.Physics.Arcade.Sprite
      platform.scale = 0.5

      const body = platform.body as Phaser.Physics.Arcade.StaticBody
      body.updateFromGameObject()
    }

    this.bunny = this.physics.add.sprite(240, 320, Textures.BunnyStand).setScale(0.5)
    this.bunny.body.checkCollision.up = false
    this.bunny.body.checkCollision.left = false
    this.bunny.body.checkCollision.right = false

    this.cameras.main.startFollow(this.bunny)
    this.cameras.main.setDeadzone(this.scale.width * 1.5)

    this.carrots = this.physics.add.group({ classType: Carrot })

    const { bunny, platforms, carrots } = this

    this.physics.add.collider(platforms, bunny)
    this.physics.add.collider(platforms, carrots)
    this.physics.add.overlap(bunny, carrots, this.handleCollectCarrot, undefined, this)

    this.keys = this.input.keyboard.createCursorKeys()

    const style: Phaser.Types.GameObjects.Text.TextStyle = { color: '#000', fontSize: '24px', fontStyle: 'bold' }
    this.carrotsCollectedText = this.add.text(240, 10, 'Carrots: 0', style).setScrollFactor(0).setOrigin(0.5, 0)
  }

  update() {
    this.platforms.children.iterate((child) => {
      const platform = child as Phaser.Physics.Arcade.Sprite
      const scrollY = this.cameras.main.scrollY

      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body.updateFromGameObject()
        this.addCarrotAbove(platform)
      }
    })

    const isTouchingDown = this.bunny.body.touching.down

    if (isTouchingDown) {
      this.bunny.setVelocityY(-300)
      this.bunny.setTexture(Textures.BunnyJump)
      this.sound.play(Sounds.Jump)
    }

    const velocityY = this.bunny.body.velocity.y
    const texture = this.bunny.texture.key

    if (velocityY > 0 && texture !== Textures.BunnyStand) {
      this.bunny.setTexture(Textures.BunnyStand)
    }

    const leftKeyIsDown = this.keys.left.isDown
    const rightKeyIsDown = this.keys.right.isDown

    if (leftKeyIsDown && !isTouchingDown) {
      this.bunny.setVelocityX(-200)
    } else if (rightKeyIsDown && !isTouchingDown) {
      this.bunny.setVelocityX(200)
    } else {
      this.bunny.setVelocityX(0)
    }

    this.horizontalWrap(this.bunny)

    const bottomPlatform = this.findBottomMostPlatform()

    if (this.bunny.y > bottomPlatform.y + 200) {
      this.scene.start(Scenes.GameOver)
    }
  }

  private horizontalWrap(sprite: Phaser.GameObjects.Sprite) {
    const halfWidth = sprite.displayWidth * 0.5
    const gameWidth = this.scale.width

    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth
    }
  }

  private addCarrotAbove(sprite: Phaser.GameObjects.Sprite) {
    const y = sprite.y - sprite.displayHeight
    const carrot = this.carrots.get(sprite.x, y, Textures.Carrot) as Phaser.Physics.Arcade.Sprite

    carrot.setActive(true)
    carrot.setVisible(true)
    carrot.body.setSize(carrot.width, carrot.height)

    this.add.existing(carrot)
    this.physics.world.enable(carrot)
  }

  private handleCollectCarrot: ArcadePhysicsCallback = (_, object) => {
    const carrot = object as Carrot
    this.carrots.killAndHide(carrot)
    this.physics.world.disableBody(carrot.body)
    this.carrotsCollected++
    this.carrotsCollectedText.text = `Carrots: ${this.carrotsCollected}`
  }

  private findBottomMostPlatform() {
    const platforms = this.platforms.getChildren() as Phaser.Physics.Arcade.Sprite[]
    let [bottomPlatform] = platforms

    for (let index = 0; index < platforms.length; ++index) {
      const platform = platforms[index]
      if (platform.y < bottomPlatform.y) continue
      bottomPlatform = platform
    }

    return bottomPlatform
  }
}
