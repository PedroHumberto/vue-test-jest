import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'


//Ao escrever testes unitários, não queremos testar as dependências do componente.np
//simulação do leilão que definimos
jest.mock('@/http')

const leilao = {
    produto: 'Livro da Casa do Codigo',
    lanceInicial: 50,
    descricao: 'Livro Sobre Vue'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1021,
        data: '2020-06-13T18:16:44.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1099,
        data: '2020-06-13T18:19:26.826Z',
        leilao_id: 1
    },
]

describe('leiloeiro inicia um leilão que não possui lances', () =>{
    test('avisa quando não existe lances', async () => {
        
        //https://jestjs.io/pt-BR/docs/mock-function-api#mockfnmockresolvedvalueoncevalue
        getLeilao.mockResolvedValueOnce(leilao)

        //informamos o array para ver se o teste retorna falso, para isso foi usada a Biblioteca flushPromises 
        getLances.mockResolvedValueOnce([/*{
            id: 1,
            valor: 100,
            data: '2020-12-01',
            leilao_id: 1
        }*/])

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('um leiloeiro exibe os lances existentes', () => {
    test('Não mostra o aviso de "sem lances"', async () => {

                getLeilao.mockResolvedValueOnce(leilao)
                getLances.mockResolvedValueOnce(lances)

                const wrapper = mount(Leiloeiro, {
                    propsData: {
                        id: 1
                    }
                })
                await flushPromises()

                const alerta = wrapper.find('.alert-dark')
                expect(alerta.exists()).toBe(false)

    })
    test('Possui uma lista de lances', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()

        const alerta = wrapper.find('.list-inline')
        expect(alerta.exists()).toBe(true)
    })
})

describe('leiloeiro comunica os valores de menor e maior lance', () =>{
    test('mostra o maior lance daquele leilão', async ()  => {
        
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')

    })
    test('mostra o menor lance', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')

    })
})