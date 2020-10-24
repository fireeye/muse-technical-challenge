import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * The toggle switch component
 *
 * @remarks
 * We can consume this in following way. All the property passed are optional.
 * <fireeye-toggle-switch 
 *  background-active="green" 
 *  background-in-active="red" 
 *  width="100px"
 *  height="50px"
 *  value="true" 
 *  is-rounded="true">
 * </fireeye-toggle-switch>
 * 
 * @public
 */
@Component({
    tag: 'fireeye-toggle-switch',
    styleUrl: 'fireeye-toggle-switch.css',
    shadow: true
})
export class ToggleSwitch {

    /**
        * The value of toggle  switch
    */
    @Prop({ mutable: true, reflect: true }) value: boolean = false;

    /**
        * Background of toggle when in active state
    */
    @Prop() backgroundActive: string = "#918e8e";

    /**
        * Background of toggle when in in-active state
    */
    @Prop() backgroundInActive: string = "#d6d4d4";

    /**
        * width of toggle switch
    */
    @Prop() width: string = "40px";

    /**
        * height of toggle switch
    */
    @Prop() height: string = "20px";

    /**
        * if yes toggle is rounded else square
    */
    @Prop() isRounded: boolean = true;

    /**
        * Click event
    */
    @Event({ bubbles: true, composed: true }) toggleClick: EventEmitter<any>;

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
                    checked={this.value} />
                <span
                    ref={el => this.switchSpan = el}
                    class={this.isRounded ? "switch round" : "switch"} />
            </label>
        )
    }

    toggleSwitchHandler() {
        this.value = this.checkBox.checked;
        this.setBackground();
        this.toggleClick.emit({value: this.value});
    }

    setBackground() {
        this.switchSpan.style.setProperty('background', this.value ? this.backgroundActive : this.backgroundInActive);
    }

    setContainerSize() {
        this.container.style.setProperty('width', this.width);
        this.container.style.setProperty('height', this.height);
    }
}