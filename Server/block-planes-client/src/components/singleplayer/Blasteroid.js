import BlasteroidBullet from './BlasteroidBullet';
import Particle from './Particle';
import { asteroidVertices, randomNumBetween } from './helpers';

export default class Blasteroid {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: randomNumBetween(-1.5, 1.5),
      y: randomNumBetween(-1.5, 1.5)
    }
    this.rotation = 0;
    this.rotationSpeed = randomNumBetween(-1, 1)
    this.radius = args.size;
    this.offset = args.offset;
    this.score = (80/this.radius)*5;
    this.create = args.create;
    this.addScore = args.addScore;
    this.vertices = asteroidVertices(8, args.size);
    this.lastShot = 0;
    this.img1 = new Image();
    this.img1.src = `https://s3-us-west-1.amazonaws.com/blockplanes/enemies/blast.png`;
  }

  destroy(){
    this.delete = true;
    this.addScore(this.score);

    // Explode
    for (let i = 0; i < this.radius; i++) {
      const particle = new Particle({
        lifeSpan: randomNumBetween(60, 100),
        size: randomNumBetween(1, 3),
        position: {
          x: this.position.x + randomNumBetween(-this.radius/4, this.radius/4),
          y: this.position.y + randomNumBetween(-this.radius/4, this.radius/4)
        },
        velocity: {
          x: randomNumBetween(-1.5, 1.5),
          y: randomNumBetween(-1.5, 1.5)
        }
      });
      this.create(particle, 'particles');
    }

    // Break into smaller blasteroids
    if(this.radius > 20){
      for (let i = 0; i < 3; i++) {
        let blasteroid = new Blasteroid({

          size: this.radius/2,
          offset: this.offset/2,
          position: {
            x: randomNumBetween(-10, 20)+this.position.x,
            y: randomNumBetween(-10, 20)+this.position.y
          },
          create: this.create.bind(this),
          addScore: this.addScore.bind(this)
        });
        this.create(blasteroid, 'blasteroids');
      }
    }
  }

  render(state){
    let component = this;

    if(Date.now() - this.lastShot > 1000) {
      const blasteroidBullet = new BlasteroidBullet({ship: this});
      this.create(blasteroidBullet, 'blasteroidBullets');
      this.lastShot = Date.now();
    }

    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Rotation
    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    // Screen edges
    if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.drawImage(this.img1, this.offset, this.offset, (this.radius*1.75), (this.radius*1.75));
    context.restore();
  }
}
