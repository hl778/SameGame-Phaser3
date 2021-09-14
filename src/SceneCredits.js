/**
 * credits scene
 * Author: hl778 https://github.com/hl778
 */

export default class SceneCredits extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    create() {
        let content = `Credits: \n\n[color=#84caff]Favicons[/color] made from Freepik from www.flaticon.com\n
[color=#84caff]In-game dialogues[/color] by Atari, Bandai, Toys for Bob, Chris Gray Enterprises, Sierra Online, Capcom\n
[color=#84caff]Game ending dialogue[/color] by Nextech (modified)\n
[color=#84caff]Background image[/color] from www.unsplash.com\n
[color=#84caff]Tile images[/color] from www.delapouite.com by Delapouite from www.delapouite.com, Lorc from www.lorcblog.blogspot.com, DarkZaitzev from www.darkzaitzev.deviantart.com under CC BY 3.0\n
[color=#84caff]Game characters, buttons and side-assets[/color] created using Pixilart from www.pixilart.com\n
[color=#84caff]Assets[/color] packed using Free Texture Packer from www.free-tex-packer.com\n
[color=#84caff]Polygons[/color] edited using PhysicsEditor from www.codeandweb.com\n
[color=#84caff]Pixelation shader[/color] is modified by Rex and originally form GeeXLab, Agnius Vasiliauskas at www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/\n
[color=#84caff]BBCode Text[/color] by Rex at www.rexrainbow.github.io/phaser3-rex-notes/docs/site/bbcodetext/\n\n\n
[img=creditLogo]\n\n
[color=#f6f592]Author:[/color] www.github.com/HL778`;

        this.text = this.add.rexBBCodeText(this.game.scale.gameSize.width*0.5, this.game.scale.gameSize.height*0.02,
            content, {
                fontSize: this.game.scale.gameSize.width*0.08,
                fontFamily: 'advanced_pixel',
                align:"center",
                color: '#ffffff',
                padding: 10,
                wrap: {
                    mode: 'char',
                    width: this.game.scale.gameSize.width*0.98
                }
        }).setOrigin(0.5,0);

        // btn
        // pause button
        const creditsClose = this.add.sprite(this.game.scale.gameSize.width-2,2,
            'pack_texture', 'creditsClose.png');
        creditsClose.setOrigin(1, 0); // anchor
        creditsClose.setScale(this.game._scaleRatio); // retina display scale down
        creditsClose.displayWidth = this.game.scale.gameSize.width * 0.1; // max width
        creditsClose.scaleY = creditsClose.scaleX; // keep the ratio
        creditsClose.setInteractive({ useHandCursor: true });//btn hover event
        creditsClose.on('pointerdown', () => this.clickCreditsClose());
        // global touch
        this.pointer = this.input.activePointer;
    }

    update() {
        if (!this.pointer.isDown) {
            this.text.y -= 0.9;
            this.text.y = Phaser.Math.Clamp(this.text.y, -this.text.height/2, 100);
        }
    }

    clickCreditsClose() {
        // fadeout camera
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.stop("creditsScene");
            this.scene.start("titleScene");
        });
    }

}