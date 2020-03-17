import { DaqPillElement } from './daq-pill'

describe('daq-pill', function() {
	let el: DaqPillElement

	beforeEach(async function() {
		el = document.createElement('daq-pill')
		el.style.display = 'none'
		document.body.appendChild(el)
		await el.updateComplete
	})

	afterEach(function() {
		document.body.removeChild(el)
	})

	it('should create instance', function() {
		const el = document.createElement('daq-pill')
		chai.expect(el).to.be.instanceof(DaqPillElement)
	})

	it('should have correct default values', function() {
		const el = document.createElement('daq-pill')
		chai.expect(el.removable).to.be.false
		chai.expect(el.selectable).to.be.false
		chai.expect(el.selected).to.be.false
		chai.expect(el.value).to.be.undefined
	})

	it('should update property removable', function() {
		el.setAttribute('removable', '')
		chai.expect(el.removable).to.be.true
		el.removeAttribute('removable')
		chai.expect(el.removable).to.be.false
	})

	it('should reflect property removable', async function() {
		el.removable = true
		await el.updateComplete
		chai.expect(el.hasAttribute('removable')).to.be.true
		el.removable = false
		await el.updateComplete
		chai.expect(el.hasAttribute('removable')).to.be.false
	})

	it('should update property selectable', function() {
		el.setAttribute('selectable', '')
		chai.expect(el.selectable).to.be.true
		el.removeAttribute('selectable')
		chai.expect(el.selectable).to.be.false
	})

	it('should reflect property selectable', async function() {
		el.selectable = true
		await el.updateComplete
		chai.expect(el.hasAttribute('selectable')).to.be.true
		el.selectable = false
		await el.updateComplete
		chai.expect(el.hasAttribute('selectable')).to.be.false
	})

	it('should update property selected', function() {
		el.setAttribute('selected', '')
		chai.expect(el.selected).to.be.true
		el.removeAttribute('selected')
		chai.expect(el.selected).to.be.false
	})

	it('should reflect property selected', async function() {
		el.selected = true
		await el.updateComplete
		chai.expect(el.hasAttribute('selected')).to.be.true
		el.selected = false
		await el.updateComplete
		chai.expect(el.hasAttribute('selected')).to.be.false
	})

	it('should update property value', function() {
		el.setAttribute('value', '42')
		chai.expect(el.value).to.equal('42')
	})

	it('should reflect property value', async function() {
		el.value = '42'
		await el.updateComplete
		chai.expect(el.getAttribute('value')).to.equal('42')
	})

	it('should raise click when element was clicked', async function() {
		let eventRaised = false
		el.addEventListener('click', () => (eventRaised = true))
		el.dispatchEvent(new Event('click'))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise click when span was clicked', async function() {
		let eventRaised = false
		el.addEventListener('click', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new Event('click', { composed: true, bubbles: true }))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise click when ENTER was pressed', async function() {
		let eventRaised = false
		el.addEventListener('click', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise click when SPACE was pressed', async function() {
		let eventRaised = false
		el.addEventListener('click', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-remove when button is clicked', async function() {
		el.removable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-remove', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('#button')
		inner.dispatchEvent(new Event('click'))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-remove when BACKSPACE was pressed', async function() {
		el.removable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-remove', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-remove when DELETE was pressed', async function() {
		el.removable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-remove', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }))
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-selected when property selected changes', async function() {
		el.selectable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-selected', () => (eventRaised = true))
		el.selected = true
		await el.updateComplete
		chai.expect(eventRaised).to.be.true
		eventRaised = false
		el.selected = false
		await el.updateComplete
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-selected when span was clicked', async function() {
		el.selectable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-selected', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new Event('click'))
		await el.updateComplete
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-selected when ENTER was pressed', async function() {
		el.selectable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-selected', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
		await el.updateComplete
		chai.expect(eventRaised).to.be.true
	})

	it('should raise daq-pill-selected when SPACE was pressed', async function() {
		el.selectable = true
		await el.updateComplete
		let eventRaised = false
		el.addEventListener('daq-pill-selected', () => (eventRaised = true))
		const inner = el.shadowRoot.querySelector('span')
		inner.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
		await el.updateComplete
		chai.expect(eventRaised).to.be.true
	})
})
