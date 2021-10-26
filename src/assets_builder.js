/**
 * common assets across scenes builder
 * Author: hl778 https://github.com/hl778
 */
export default class AssetsBuilder {
    constructor(scene) {
        this.scene = scene;
    }

    buildPackTextureAssets(config) {
        let packedName = "pack_texture";
        // btn scene to share
        const html = this.scene.add.sprite(config.x,config.y,packedName, config.filename);
        html.setOrigin(config.anchor[0], config.anchor[1]); // anchor
        html.setScale(this.scene.game._scaleRatio); // retina display scale down
        html.displayWidth = this.scene.game.scale.gameSize.width * config.widthPercentage;
        if(typeof config.heightPercentage!=='undefined') {
            html.displayHeight = this.scene.game.scale.gameSize.height * config.heightPercentage;
        }else{
            html.scaleY = html.scaleX; // keep the ratio
        }
        html.name = config.name; // define name
        if(config.canClick) {
            html.setInteractive();//btn active
        }
        html.visible = config.isVisible;
        return html;
    }

    buildText(config) {
        const text = this.scene.add.text(config.x, config.y,
            '',{ fontFamily: 'advanced_pixel' }).setWordWrapWidth(config.wrapWidth);
        text.setFontSize(config.fontSize);
        text.style.setFill(config.fill);
        text.setOrigin (config.anchor[0], config.anchor[1]); // anchor
        text.text = config.text;
        text.visible = config.isVisible;
        text.name = config.name;
        text.style.fontStyle = 'strong';
        return text;
    }

    buildArcadeSprite(config) {
        let packedName = "pack_texture";
        // btn scene to share
        const sprite = this.scene.physics.add.sprite(config.x,config.y,packedName, config.filename);
        sprite.setScale(this.scene.game._scaleRatio); // retina display scale down
        // width height platform
        sprite.displayWidth = this.scene.game.scale.gameSize.width*config.widthPercentage;
        sprite.body.setAllowGravity(config.hasGravity);
        sprite.displayHeight = config.height;
        sprite.alpha = config.alpha;
        sprite.name = config.name; // define name
        return sprite;
    }

}