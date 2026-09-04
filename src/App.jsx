import { useEffect, useState } from 'react';
import ItemCardapio from './components/ItemCardapio';

function App() {
    const [itensCarrinho, setItensCarrinho] = useState(0);
    const [cardapio, setCardapio] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');

    cardapio.length === 0 ? <h2>🔄 Carregando restaurante...</h2> : useEffect;
    useEffect(() => {
        console.log('Conectando ao servidor...');
        setTimeout(() => {
            setCardapio([
                {
                    id: 1,
                    nome: 'X-Tudo',
                    descricao:
                        'Pão Brioche, Presunto, Queijo, ovo, Hamburguer, alface, Bacon, Picanha e Cheddar',
                    preco: 'R$35,00',
                },
                {
                    id: 2,
                    nome: 'Cachorro-Quente',
                    descricao:
                        'Pão HotDog, Salsicha, Purê, Mostarda, Maionese, Ketchup, Frango, Batata Palha',
                    preco: 'R$ 26,50',
                },
                {
                    id: 3,
                    nome: 'Porção de batatas',
                    descricao: 'Batata palito, Cheddar, Bacon e Calabresa',
                    preco: 'R$ 19,90',
                },
                {
                    id: 4,
                    nome: 'Porção de Calabresa',
                    descricao: 'Calabresa, Cheddar e Bacon',
                    preco: 'R$ 25,90',
                },
                {
                    id: 5,
                    nome: 'Coca Cola',
                    descricao: 'Refrigerante 2L',
                    preco: 'R$ 8,99',
                },
                {
                    id: 6,
                    nome: 'Fanta Uva',
                    descricao: 'Refrigerante 2L',
                    preco: 'R$ 7,99',
                },
                {
                    id: 7,
                    nome: 'Bolo de Cenoura',
                    descricao: 'Fatia de Bolo de Cenoura com Cobertura Brigadeiro',
                    preco: 'R$ 10,00',
                },
                {
                    id: 8,
                    nome: 'Pudim de Leite Condensado',
                    descricao: 'Fatia de Pudim de Leite Condensado',
                    preco: 'R$ 12,00',
                },
                {
                    id: 9,
                    nome: 'Açaí na Tigela',
                    descricao: '500ml com morango e leite condensado',
                    preco: 'R$ 18,00',
                },
            ]);
        }, 2000);
    }, []);

    function finalizarCompra() {
        if (itensCarrinho === 0) {
            setMensagemModal('Seu carrinho está vazio!');
            setModalAberto(true);
            return;
        }

        if (endereco.trim() === ' ') {
            setMensagemModal('Por favor, Informe seu Endereço!');
            setModalAberto(true);
            return;
        }

        setMensagemModal('Pedido realizado com sucesso!');
        setModalAberto(true);
        setItensCarrinho(0);
        setEndereco('');
    }
    return (
        <>
            {modalAberto && (
                <div>
                    <div>
                        <p>{mensagemModal}</p>
                        <button onClick={() => setModalAberto(false)}>OK</button>
                    </div>
                </div>
            )}
            <div
                style={{
                    padding: '20px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    fontFamily: 'sans-serif',
                }}>
                <h1 style={{ margin: 0 }}>Senai Delivery</h1>

                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    <div
                        style={{
                            backgroundColor: '#222',
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                        }}>
                        🛒 Carrinho: {itensCarrinho} itens
                    </div>
                </header>

                <div>
                    {cardapio.map((item) => (
                        <ItemCardapio
                            key={item.id}
                            nome={item.nome}
                            descricao={item.descricao}
                            preco={item.preco}
                            adicionarItem={() => setItensCarrinho(itensCarrinho + 1)}
                        />
                    ))}
                </div>
                <div style={{}}>
                    <input
                        type="text"
                        placeholder="Rua e Número da Entrega"
                        value={endereco}
                        onChange={(evento) => setEndereco(evento.target.value)}
                    />

                    <button onClick={finalizarCompra}>Concluir Compra</button>
                </div>
            </div>
        </>
    );
}

export default App;
