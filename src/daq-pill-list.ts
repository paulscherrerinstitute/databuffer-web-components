import {
	LitElement,
	html,
	css,
	property,
	TemplateResult,
	CSSResultArray,
	customElement,
	PropertyValues,
} from 'lit-element'

import './daq-pill'
import { DaqPillRemoveEvent, DaqPillSelectedEvent } from './daq-pill'

export type DaqPillListChangedEvent = CustomEvent<{ value: string[] }>
export type DaqPillListSelectedEvent = CustomEvent<{ selected: string[] }>

declare global {
	interface DocumentEventMap {
		'daq-pill-list-changed': DaqPillListChangedEvent
		'daq-pill-list-selected': DaqPillListSelectedEvent
	}

	interface HTMLElementTagNameMap {
		'daq-pill-list': DaqPillListElement
	}
}

/**
 * A list of unique items, each represented as a DaqPillElement.
 */
@customElement('daq-pill-list')
export class DaqPillListElement extends LitElement {
	@property({ type: Boolean, reflect: true })
	removable: boolean = false

	@property({ type: Boolean, reflect: true })
	raised: boolean = false

	@property({ type: Boolean, reflect: true })
	selectable: boolean = false

	@property({ type: Array, reflect: true })
	selected: string[] = []

	@property({ type: Array, reflect: true })
	value: string[] = []

	private __pillRemoved(e: DaqPillRemoveEvent): void {
		this.removeItem(e.detail.value)
	}

	private __pillSelected(e: DaqPillSelectedEvent): void {
		if (e.detail.selected) {
			this.selectItem(e.detail.value)
		} else {
			this.deselectItem(e.detail.value)
		}
	}

	/**
	 * Add an item to the list.
	 * If it is already contained, nothing happens.
	 *
	 * @param item The item to add
	 */
	public addItem(item: string): void {
		// don't double add
		if (this.value.includes(item)) return
		this.value = [...this.value, item]
	}

	/**
	 * Remove an item from the list.
	 * If it is not contained, nothing happens.
	 *
	 * @param item The item to remove
	 */
	public removeItem(item: string): void {
		if (!this.value.includes(item)) return
		this.value = this.value.filter(x => x !== item)
		this.selected = this.selected.filter(x => x !== item)
	}

	/**
	 * Select an item of the list, if the list is selectable.
	 * If the item is already selected, nothing happens.
	 *
	 * If the item to be selected is not on the list, nothing happens.
	 *
	 * @param item The item to select
	 */
	public selectItem(item: string): void {
		if (!this.selectable) return
		// don't double select
		if (this.selected.includes(item)) return
		if (!this.value.includes(item)) return
		this.selected = [...this.selected, item]
	}

	/**
	 * Deselect an item of the list, if the list is selectable.
	 * If the item is not selected, nothing happens.
	 *
	 * @param item The item to deselect
	 */
	public deselectItem(item: string): void {
		if (!this.selectable) return
		if (!this.selected.includes(item)) return
		this.selected = this.selected.filter(x => x !== item)
	}

	updated(changedProperties: PropertyValues): void {
		if (changedProperties.has('value')) {
			const changeEvent = new CustomEvent('daq-pill-list-changed', {
				composed: true,
				bubbles: true,
				detail: {
					value: this.value,
				},
			})
			this.dispatchEvent(changeEvent)
		}
		if (changedProperties.has('selected')) {
			const changeEvent = new CustomEvent('daq-pill-list-selected', {
				composed: true,
				bubbles: true,
				detail: {
					selected: this.selected,
				},
			})
			this.dispatchEvent(changeEvent)
		}
	}

	render(): TemplateResult {
		return html`
			${this.value.map(
				x =>
					html`
						<daq-pill
							?removable=${this.removable}
							?raised=${this.raised}
							?selectable=${this.selectable}
							?selected=${this.selected.includes(x)}
							@daq-pill-remove=${this.__pillRemoved}
							@daq-pill-selected=${this.__pillSelected}
							.value=${x}
							>${x}</daq-pill
						>
					`
			)}
		`
	}

	static get styles(): CSSResultArray {
		return [
			css`
				:host {
					display: inline-block;
				}
			`,
		]
	}
}
