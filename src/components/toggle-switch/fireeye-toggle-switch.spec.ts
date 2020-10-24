import { newSpecPage } from "@stencil/core/testing";
import { ToggleSwitch } from "./fireeye-toggle-switch";

describe("ToggleSwitch", () => {
  it("should render with shadow dom", async () => {
    const { root } = await newSpecPage({
      components: [ToggleSwitch],
      html: "<fireeye-toggle-switch></fireeye-toggle-switch>",
    });
    expect(root).toEqualHtml(`
          <fireeye-toggle-switch>
            <mock:shadow-root>
             <label class="container" style="width:40px; height: 20px;">
              <input class="checkbox" type="checkbox">
              <span class="round switch" style="background: #d6d4d4;"></span>
            </label>
            </mock:shadow-root>
          </fireeye-toggle-switch>
        `);
  });

  it("should render without shadow dom", async () => {
    const page = await newSpecPage({
      components: [ToggleSwitch],
      html: "<fireeye-toggle-switch></fireeye-toggle-switch>",
      supportsShadowDom: false,
    });
    expect(page.root.shadowRoot).toBeFalsy();
    expect(page.root.querySelector(".checkbox")).toBeTruthy();
  });

  it("Should emit on click", async () => {
    const page = await newSpecPage({
      components: [ToggleSwitch],
      html: "<fireeye-toggle-switch></fireeye-toggle-switch>",
      supportsShadowDom: false,
    });
    let button = page.root.querySelector(".checkbox") as HTMLInputElement;
    let buttonSpy = jest.fn();
    page.root.addEventListener("click", buttonSpy);
    button.click();
    expect(buttonSpy).toHaveBeenCalled();
  });

  it('should emit click event', async () => {
    let eventSpy = jest.fn();
    const page = await newSpecPage({
      components: [ToggleSwitch],
      html: "<fireeye-toggle-switch></fireeye-toggle-switch>",
      supportsShadowDom: false,
    });
    page.root.addEventListener('toggleClick', eventSpy);
    let button = page.root.querySelector(".checkbox") as HTMLInputElement;
    button.click();
    expect(eventSpy).toHaveBeenCalled();        
  });
});
