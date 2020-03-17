import {
	LitElement,
	html,
	css,
	property,
	TemplateResult,
	CSSResultArray,
	customElement,
	query,
	PropertyValues,
} from 'lit-element'
import { nothing } from 'lit-html'

export type DaqPillRemoveEvent = CustomEvent<{ value: string }>
export type DaqPillSelectedEvent = CustomEvent<{
	value: string
	selected: boolean
}>

declare global {
	interface DocumentEventMap {
		'daq-pill-remove': DaqPillRemoveEvent
		'daq-pill-selected': DaqPillSelectedEvent
	}

	interface HTMLElementTagNameMap {
		'daq-pill': DaqPillElement
	}
}

@customElement('daq-pill')
export class DaqPillElement extends LitElement {
	@property({ type: Boolean, reflect: true })
	removable: boolean = false

	@property({ type: Boolean, reflect: true })
	selectable: boolean = false

	@property({ type: Boolean, reflect: true })
	selected: boolean = false

	@property({ type: String, reflect: true })
	value: string

	@query('#button')
	private __button!: HTMLElement

	@query('#container')
	private __container!: HTMLElement

	private __onButtonClicked(): void {
		if (!this.removable) return
		const evt = new CustomEvent('daq-pill-remove', {
			composed: true,
			bubbles: true,
			detail: { value: this.value },
		})
		this.dispatchEvent(evt)
	}

	private __onKeyDown(e: KeyboardEvent): void {
		if (e.isComposing) return
		if (e.key === 'Delete' || e.key === 'Backspace') {
			this.__button.dispatchEvent(new Event('click'))
		}
		if (e.key === 'Enter' || e.key === ' ') {
			this.__container.dispatchEvent(
				new Event('click', { bubbles: true, composed: true })
			)
		}
	}

	private __onClick(e: Event) {
		if (this.selectable) this.selected = !this.selected
	}

	updated(changedProperties: PropertyValues): void {
		if (changedProperties.has('selected')) {
			this.dispatchEvent(
				new CustomEvent('daq-pill-selected', {
					composed: true,
					bubbles: true,
					detail: {
						value: this.value,
						selected: this.selected,
					},
				})
			)
		}
	}

	render(): TemplateResult {
		const removeTemplate = (): TemplateResult | {} =>
			this.removable
				? html`
						<span id="button" @click="${this.__onButtonClicked}"
							><slot name="button">&times;</slot></span
						>
				  `
				: nothing
		return html`
			<span
				id="container"
				@click=${this.__onClick}
				@keydown=${this.__onKeyDown}
				tabindex="0"
				><slot></slot>${removeTemplate()}</span
			>
		`
	}

	static get styles(): CSSResultArray {
		return [
			css`
				:host {
					display: inline-block;
					padding: 0.2em 0.5em;
					background-color: none;
					border: 1px solid hsl(0, 0%, 80%);
					color: hsl(0, 0%, 20%);
					border-radius: 1em;
					user-select: none;
					font-size: 75%;
					box-shadow: none;
				}
				:host([raised]) {
					box-shadow: 2px 2px 4px 0 hsl(0, 0%, 70%);
				}
				:host([selected]) {
					background-color: hsl(0, 0%, 80%);
				}
				#button {
					margin-left: 0.2em;
				}
			`,
		]
	}
}
