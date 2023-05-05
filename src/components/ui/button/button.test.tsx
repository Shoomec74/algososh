import { render } from '@testing-library/react'
import { Button } from './button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
	it('renders with correct text', () => {
		const { getByRole } = render(<Button text='onClick' />)
		const button = getByRole('button')
		expect(button).toMatchSnapshot()
	})
	it('renders without correct text', () => {
		const { getByRole } = render(<Button />)
		const button = getByRole('button')
		expect(button).toMatchSnapshot()
	})
	it('renders with disabled state', () => {
		const { getByRole } = render(<Button disabled />)
		const button = getByRole('button')
		expect(button).toMatchSnapshot()
	})
	it('renders with loading state', () => {
		const { getByRole } = render(<Button isLoader />)
		const button = getByRole('button')
		expect(button).toMatchSnapshot()
	})
	it('calls onClick', () => {
		const onClick = jest.fn()
		const { getByRole } = render(<Button onClick={onClick} />)
		const button = getByRole('button')
		expect(onClick).toBeCalledTimes(0)
		userEvent.click(button)
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})
