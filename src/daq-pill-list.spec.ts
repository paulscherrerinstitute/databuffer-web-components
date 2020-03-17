import {
	DaqPillListElement,
	DaqPillListSelectedEvent,
	DaqPillListChangedEvent,
} from './daq-pill-list'

describe('daq-pill-list', function() {
	let el: DaqPillListElement

	beforeEach(async function() {
		el = document.createElement('daq-pill-list')
		el.style.display = 'none'
		document.body.appendChild(el)
		await el.updateComplete
	})

	afterEach(function() {
		document.body.removeChild(el)
	})

	it('should create instance', function() {
		const el = document.createElement('daq-pill-list')
		chai.expect(el).to.be.instanceof(DaqPillListElement)
	})

	it('should have correct default values', function() {
		const el = document.createElement('daq-pill-list')
		chai.expect(el.removable).to.be.false
		chai.expect(el.raised).to.be.false
		chai
			.expect(el.value)
			.to.be.an('Array')
			.with.length(0)
		chai.expect(el.selectable).to.be.false
		chai
			.expect(el.selected)
			.to.be.an('Array')
			.with.length(0)
	})

	it('should update property raised', function() {
		el.setAttribute('raised', '')
		chai.expect(el.raised).to.be.true
		el.removeAttribute('raised')
		chai.expect(el.raised).to.be.false
	})

	it('should reflect property raised', async function() {
		el.raised = true
		await el.updateComplete
		chai.expect(el.hasAttribute('raised')).to.be.true
		el.raised = false
		await el.updateComplete
		chai.expect(el.hasAttribute('raised')).to.be.false
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
		const tags = ['foo', 'bar', 'baz']
		el.setAttribute('selected', JSON.stringify(tags))
		chai.expect(el.selected).to.deep.equal(tags)
	})

	it('should reflect property selected', async function() {
		const tags = ['foo', 'bar', 'baz']
		el.selected = tags
		await el.updateComplete
		chai.expect(JSON.parse(el.getAttribute('selected'))).to.deep.equal(tags)
	})

	it('should not select or deselect if not selectable', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = false
		el.selected = []
		el.selectItem('bar')
		chai.expect(el.selected.length).to.equal(0)
		// force selected
		el.selected = ['foo']
		el.deselectItem('foo')
		chai.expect(el.selected.length).to.equal(1)
	})

	it('should update selected when item is selected', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo']
		chai.expect(el.selected.length).to.equal(1)
		chai.expect(el.selected).to.not.contain('bar')
		el.selectItem('bar')
		chai.expect(el.selected.length).to.equal(2)
		chai.expect(el.selected).to.contain('bar')
	})

	it('should select item only once', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo']
		chai.expect(el.selected.length).to.equal(1)
		el.selectItem('bar')
		chai.expect(el.selected.length).to.equal(2)
		el.selectItem('bar')
		el.selectItem('bar')
		el.selectItem('bar')
		chai.expect(el.selected.length).to.equal(2)
	})

	it('should update selected when item is deselected', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo', 'bar', 'baz']
		chai.expect(el.selected).to.contain('bar')
		el.deselectItem('bar')
		chai.expect(el.selected).to.not.contain('bar')
	})

	it('should update selected when item is removed', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selected = ['foo', 'bar', 'baz']
		chai.expect(el.selected).to.contain('bar')
		el.removeItem('bar')
		chai.expect(el.selected).to.not.contain('bar')
	})

	it('should deselect item only once', function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo', 'bar', 'baz']
		chai.expect(el.selected.length).to.equal(3)
		el.deselectItem('bar')
		chai.expect(el.selected.length).to.equal(2)
		el.deselectItem('bar')
		el.deselectItem('bar')
		el.deselectItem('bar')
		chai.expect(el.selected.length).to.equal(2)
	})

	it('should raise daq-pill-list-selected when item is selected', async function() {
		let capturedEvent: DaqPillListSelectedEvent = null
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo']
		el.addEventListener(
			'daq-pill-list-selected',
			(e: DaqPillListSelectedEvent) => {
				capturedEvent = e
			}
		)
		el.selectItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.exist
		chai.expect(capturedEvent.detail.selected).to.deep.equal(['foo', 'bar'])
		// check multiple triggers
		capturedEvent = null
		el.selectItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.not.exist
	})

	it('should raise daq-pill-list-selected when item is deselected', async function() {
		let capturedEvent: DaqPillListSelectedEvent = null
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo', 'bar']
		el.addEventListener(
			'daq-pill-list-selected',
			(e: DaqPillListSelectedEvent) => {
				capturedEvent = e
			}
		)
		el.deselectItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.exist
		chai.expect(capturedEvent.detail.selected).to.deep.equal(['foo'])
		// check multiple triggers
		capturedEvent = null
		el.deselectItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.not.exist
	})

	it('should update property value', function() {
		const tags = ['foo', 'bar', 'baz']
		el.setAttribute('value', JSON.stringify(tags))
		chai.expect(el.value).to.deep.equal(tags)
	})

	it('should reflect property value', async function() {
		const tags = ['foo', 'bar', 'baz']
		el.value = tags
		await el.updateComplete
		chai.expect(JSON.parse(el.getAttribute('value'))).to.deep.equal(tags)
	})

	it('should update value when item is added', function() {
		el.value = ['foo', 'bar', 'baz']
		el.addItem('qoox')
		chai.expect(el.value).to.contain('qoox')
	})

	it('should add item only once', function() {
		el.value = ['foo', 'bar', 'baz']
		chai.expect(el.value.length).to.equal(3)
		el.addItem('qoox')
		chai.expect(el.value.length).to.equal(4)
		el.addItem('qoox')
		el.addItem('qoox')
		el.addItem('qoox')
		chai.expect(el.value.length).to.equal(4)
	})

	it('should update value when item is removed', function() {
		el.value = ['foo', 'bar', 'baz']
		el.removeItem('bar')
		chai.expect(el.value).to.not.contain('bar')
	})

	it('should remove item only once', function() {
		el.value = ['foo', 'bar', 'baz']
		chai.expect(el.value.length).to.equal(3)
		el.removeItem('bar')
		chai.expect(el.value.length).to.equal(2)
		el.removeItem('bar')
		el.removeItem('bar')
		el.removeItem('bar')
		chai.expect(el.value.length).to.equal(2)
	})

	it('should raise daq-pill-list-changed when item is added', async function() {
		let capturedEvent: DaqPillListChangedEvent = null
		el.value = ['foo', 'bar', 'baz']
		el.addEventListener(
			'daq-pill-list-changed',
			(e: DaqPillListChangedEvent) => {
				capturedEvent = e
			}
		)
		el.addItem('qoox')
		await el.updateComplete
		chai.expect(capturedEvent).to.exist
		chai
			.expect(capturedEvent.detail.value)
			.to.deep.equal(['foo', 'bar', 'baz', 'qoox'])
		// check multiple triggers
		capturedEvent = null
		el.addItem('qoox')
		await el.updateComplete
		chai.expect(capturedEvent).to.not.exist
	})

	it('should raise daq-pill-list-changed when item is removed', async function() {
		let capturedEvent: DaqPillListChangedEvent = null
		el.value = ['foo', 'bar', 'baz']
		el.addEventListener(
			'daq-pill-list-changed',
			(e: DaqPillListChangedEvent) => {
				capturedEvent = e
			}
		)
		el.removeItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.exist
		chai.expect(capturedEvent.detail.value).to.deep.equal(['foo', 'baz'])
		// check multiple triggers
		capturedEvent = null
		el.removeItem('bar')
		await el.updateComplete
		chai.expect(capturedEvent).to.not.exist
	})

	it('should remove item from value and selected when item fires daq-pill-remove', async function() {
		el.value = ['foo', 'bar', 'baz']
		el.selectable = true
		el.selected = ['foo', 'bar', 'baz']
		await el.updateComplete
		const inner = el.shadowRoot.querySelector('daq-pill')
		chai.expect(inner).to.be.not.null
		inner.dispatchEvent(
			new CustomEvent('daq-pill-remove', {
				composed: true,
				bubbles: true,
				detail: { value: 'foo' },
			})
		)
		await el.updateComplete
		chai.expect(el.value).to.deep.equal(['bar', 'baz'])
		chai.expect(el.selected).to.deep.equal(['bar', 'baz'])
	})
})
