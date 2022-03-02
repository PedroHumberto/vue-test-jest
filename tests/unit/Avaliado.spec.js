import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro da Amazon',
        lanceInicial: 50,
        descricao: 'livro sobre VueJS'
    },
    {
        produto: 'Livro da Abril',
        lanceInicial: 55,
        descricao: 'livro sobre React'
    },
]

describe('um avaliador que se conecta com a API', () => {
    test('mostra todos os leilões retornados pela API', async () =>{
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                //dublagem de componente
                //tipos de duble https://cursos.alura.com.br/extra/alura-mais/diferentes-tipos-de-dubles-de-testes-c285
                RouterLink: RouterLinkStub
                //https://v1.test-utils.vuejs.org/guides/#common-tips
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)

    })
    test('Não há leilões retornados pela API', async () =>{
        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)

    })
})
