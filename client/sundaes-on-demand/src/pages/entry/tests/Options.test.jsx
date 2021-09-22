import { render , screen } from '../../../test-utils/testing-library-utils'

import Options from '../Options'

test('display image for each scoop option from server', async() => {
    render(<Options optionType = "scoops" />)

    // find images
    const scoopImages = await screen.findAllByRole('img' , {name : /scoop$/i})
    expect(scoopImages).toHaveLength(2)

    // confirm alt test of images

    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop' , 'Vanilla scoop'])
})

test('display image for each toppings option from server', async() => {
    render(<Options optionType = "toppings" />)

    // find image
    const toppingImages = await screen.findAllByRole('img' , {name : /topping$/i})
    expect(toppingImages).toHaveLength(3)

    // confirm alt test of images

    const altText = toppingImages.map((element) => element.alt)
    expect(altText).toEqual(['Cherries topping' , 'M&Ms topping' , 'Hot fudge topping'])
})

