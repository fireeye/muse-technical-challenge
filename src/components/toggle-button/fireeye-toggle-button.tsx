import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
/**
 * The toggle button component
 *
 * @remarks
 * We can consume this in following way. All the property passed are optional.
 * <fireeye-toggle-button 
 *  background-active="green" 
 *  background-in-active="red" 
 *  width="100px"
 *  height="50px"
 *  checked="true" 
 *  is-rounded="true">
 * </fireeye-toggle-button>
 * 
 * @public
 */
@Component({
    tag: 'fireeye-toggle-button',
    styleUrl: 'fireeye-toggle-button.css',
    shadow: true
})
export class ToggleButton {

    /**
        * The checked status
    */
    @Prop({ mutable: true, reflect: true }) checked: boolean = false;

    /**
        * Background active
    */
    @Prop() backgroundActive: string = "#918e8e";

    /**
        * Background Inactive
    */
    @Prop() backgroundInActive: string = "#d6d4d4";

    /**
        * Set width
    */
    @Prop() width: string = "40px";

    /**
        * Set height
    */
    @Prop() height: string = "20px";

    /**
        * Is rounded
    */
    @Prop() isRounded: boolean = true;

    /**
        * Click event
    */
    @Event({ bubbles: true, composed: true }) toggleClick: EventEmitter<boolean>;

    checkBox: HTMLInputElement;
    switchSpan: HTMLSpanElement;
    container: HTMLLabelElement;

    componentDidLoad() {
        this.setContainerSize();
        this.setBackground();
    }

    render() {
        return (
            <label
                ref={el => this.container = el}
                class="container">
                <input
                    type="checkbox"
                    class="checkbox"
                    ref={el => this.checkBox = el}
                    onClick={this.toggleSwitchHandler.bind(this)}
                    checked={this.checked} />
                <span
                    ref={el => this.switchSpan = el}
                    class={this.isRounded ? "switch round" : "switch"} />
            </label>
        )
    }

    toggleSwitchHandler() {
        this.checked = this.checkBox.checked;
        this.setBackground();
        this.toggleClick.emit(this.checked);
    }

    setBackground() {
        this.switchSpan.style.setProperty('background', this.checked ? this.backgroundActive : this.backgroundInActive);
    }

    setContainerSize() {
        this.container.style.setProperty('width', this.width);
        this.container.style.setProperty('height', this.height);
    }
}