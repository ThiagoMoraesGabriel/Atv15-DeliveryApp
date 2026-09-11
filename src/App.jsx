import { useEffect, useState } from 'react';
import ItemCardapio from './components/ItemCardapio';
import styles from './App.module.css';

function App() {
    const [itensCarrinho, setItensCarrinho] = useState(0);
    const [cardapio, setCardapio] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');

    const [restauranteAberto, setRestauranteAberto] = useState(false);
    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

    const categorias = ['Todos', 'Lanches', 'Porções', 'Bebidas', 'Sobremesas'];

    useEffect(() => {
        console.log('Conectando ao servidor...');
        setTimeout(() => {
            setCardapio([
                {
                    id: 1,
                    nome: 'X-Tudo',
                    descricao: 'Pão Brioche, Presunto, Queijo, ovo, Hamburguer, alface, Bacon, Picanha e Cheddar',
                    preco: 'R$ 35,00',
                    categoria: 'Lanches'
                },
                {
                    id: 2,
                    nome: 'Cachorro-Quente',
                    descricao: 'Pão HotDog, Salsicha, Purê, Mostarda, Maionese, Ketchup, Frango, Batata Palha',
                    preco: 'R$ 26,50',
                    categoria: 'Lanches'
                },
                {
                    id: 3,
                    nome: 'Porção de batatas',
                    descricao: 'Batata palito, Cheddar, Bacon e Calabresa',
                    preco: 'R$ 19,90',
                    categoria: 'Porções'
                },
                {
                    id: 4,
                    nome: 'Porção de Calabresa',
                    descricao: 'Calabresa, Cheddar e Bacon',
                    preco: 'R$ 25,90',
                    categoria: 'Porções'
                },
                {
                    id: 5,
                    nome: 'Coca Cola',
                    descricao: 'Refrigerante 2L',
                    preco: 'R$ 8,99',
                    categoria: 'Bebidas'
                },
                {
                    id: 6,
                    nome: 'Fanta Uva',
                    descricao: 'Refrigerante 2L',
                    preco: 'R$ 7,99',
                    categoria: 'Bebidas'
                },
                {
                    id: 7,
                    nome: 'Bolo de Cenoura',
                    descricao: 'Fatia de Bolo de Cenoura com Cobertura Brigadeiro',
                    preco: 'R$ 10,00',
                    categoria: 'Sobremesas'
                },
                {
                    id: 8,
                    nome: 'Pudim de Leite Condensado',
                    descricao: 'Fatia de Pudim de Leite Condensado',
                    preco: 'R$ 12,00',
                    categoria: 'Sobremesas'
                },
                {
                    id: 9,
                    nome: 'Açaí na Tigela',
                    descricao: '500ml com morango e leite condensado',
                    preco: 'R$ 18,00',
                    categoria: 'Sobremesas'
                },
            ]);
        }, 2000);
    }, []);

    // Lógica para filtrar o cardápio
    const cardapioFiltrado = categoriaAtiva === 'Todos' 
        ? cardapio 
        : cardapio.filter(item => item.categoria === categoriaAtiva);

    function finalizarCompra() {
        if (!restauranteAberto) {
            setMensagemModal('🔴 Desculpe, o restaurante está fechado no momento!');
            setModalAberto(true);
            return;
        }

        if (itensCarrinho === 0) {
            setMensagemModal('🍔 Seu carrinho está vazio! Adicione algum lanche.');
            setModalAberto(true);
            return;
        }

        if (endereco.trim() === '') {
            setMensagemModal('📍 Por favor, informe seu endereço para entrega!');
            setModalAberto(true);
            return;
        }

        setMensagemModal('✅ Pedido realizado com sucesso! Em breve chegará até você.');
        setModalAberto(true);
        setItensCarrinho(0);
        setEndereco('');
    }

    return (
        <>
            {/* Modal de Alerta */}
            {modalAberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <p>{mensagemModal}</p>
                        <button className={styles.btnModal} onClick={() => setModalAberto(false)}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Painel Administrativo de Abertura */}
            <div className={styles.painelGerente}>
                <button 
                    className={`${styles.btnInterruptor} ${restauranteAberto ? styles.btnInterruptorAberto : styles.btnInterruptorFechado}`}
                    onClick={() => setRestauranteAberto(!restauranteAberto)}
                >
                    {restauranteAberto ? "🟢 Aberto para Pedidos" : "🔴 Restaurante Fechado"}
                </button>
            </div>

            {/* Container Principal */}
            <div className={styles.appContainer}>
                <header className={styles.appHeader}>
                    <h1 className={styles.appTitle}>🍔 Senai Delivery</h1>
                    <div className={styles.cartBadge}>
                        🛒 Carrinho: {itensCarrinho} {itensCarrinho === 1 ? 'item' : 'itens'}
                    </div>
                </header>

                {/* Filtros de Categorias */}
                <div className={styles.filtros}>
                    {categorias.map(cat => (
                        <button 
                            key={cat}
                            className={`${styles.btnFiltro} ${categoriaAtiva === cat ? styles.btnFiltroAtivo : ''}`}
                            onClick={() => setCategoriaAtiva(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Lista de Produtos */}
                {cardapio.length === 0 ? (
                    <h2 className={styles.loadingText}>🔄 Preparando a chapa...</h2>
                ) : (
                    <div className={styles.cardapioLista}>
                        {cardapioFiltrado.map((item) => (
                            <ItemCardapio
                                key={item.id}
                                nome={item.nome}
                                descricao={item.descricao}
                                preco={item.preco}
                                categoria={item.categoria}
                                adicionarItem={() => setItensCarrinho(itensCarrinho + 1)}
                            />
                        ))}
                        {cardapioFiltrado.length === 0 && (
                            <p className={styles.mensagemVazia}>Nenhum item encontrado nesta categoria.</p>
                        )}
                    </div>
                )}

                {/* Área de Finalização */}
                <div className={styles.checkoutSection}>
                    <input
                        className={styles.addressInput}
                        type="text"
                        placeholder="Rua e Número da Entrega"
                        value={endereco}
                        onChange={(evento) => setEndereco(evento.target.value)}
                    />
                    <button className={styles.btnConcluir} onClick={finalizarCompra}>
                        Concluir Compra
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;