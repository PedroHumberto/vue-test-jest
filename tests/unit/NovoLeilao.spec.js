import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'





jest.mock('@/http')

const $router = {
    push: jest.fn()
}

describe('Um novo leilao deve ser criado', () => {
    test('dado um formulario preenchido, um leilao deve ser cirado', async () =>{
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks:{
                $router
            }
        })

        wrapper.find('.produto').setValue('Um Livro de Vuejs')
        wrapper.find('.descricao').setValue('Conteudo principal')
        wrapper.find('.valor').setValue(50)
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled()
    })
})