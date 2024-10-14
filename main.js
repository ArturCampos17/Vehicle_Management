// Função para buscar marcas do backend
async function fetchBrands() {
    try {
        const response = await fetch('http://localhost:3000/api/brands/'); 
        if (!response.ok) {
            throw new Error('Erro ao buscar marcas');
        }

        const data = await response.json(); // A resposta da API
        const brands = data.brands; // Acessa o array 'brands'
        const brandSelect = document.getElementById('brandSelect');

        // Limpa opções existentes
        brandSelect.innerHTML = '<option value="">Selecione uma marca</option>';

        // Adiciona opções ao select
        if (Array.isArray(brands)) {
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand.id_brand; // ID da marca
                option.textContent = brand.name; // Nome da marca
                brandSelect.appendChild(option);
            });
        } else {
            console.error('A resposta não contém um array de marcas:', brands);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para buscar modelos com base na marca selecionada
async function fetchModelsByBrand(brandId) {
    try {
        const response = await fetch(`http://localhost:3000/api/models/${brandId}`); // Chama a sua rota com brandId
        if (!response.ok) {
            throw new Error('Erro ao buscar modelos');
        }

        const data = await response.json(); // A resposta da API
        const models = data.models; 
        const modelSelect = document.getElementById('modelSelect');

        // Limpa opções existentes
        modelSelect.innerHTML = '<option value="">Selecione um modelo</option>';
        modelSelect.disabled = false; // Habilita o select de modelos

        // Adiciona opções ao select
        if (Array.isArray(models)) {
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id_model; // ID do modelo
                option.textContent = model.name; // Nome do modelo
                modelSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.textContent = 'Nenhum modelo disponivel'; // Nome do modelo
            modelSelect.appendChild(option);
            console.error('A resposta não contém um array de modelos:', models);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}


// Chama a função para buscar marcas ao carregar a página
document.addEventListener('DOMContentLoaded', fetchBrands);

// Adiciona um evento de mudança ao select de marcas
document.getElementById('brandSelect').addEventListener('change', (event) => {
    const selectedBrandId = event.target.value;
    const modelSelect = document.getElementById('modelSelect');

    // Se uma marca for selecionada, busca os modelos dessa marca
    if (selectedBrandId) {
        fetchModelsByBrand(selectedBrandId);
    } else {
        modelSelect.innerHTML = '<option value="">Selecione um modelo</option>';
        modelSelect.disabled = true; // Desabilita o select de modelos
    }
});


// Função para capturar o evento de clique no botão "enviar"
document.getElementById('button').addEventListener('click', function() {
    // Pega os valores dos selects
    const brandSelect = document.getElementById('brandSelect');
    const modelSelect = document.getElementById('modelSelect');

    const selectedBrand = brandSelect.options[brandSelect.selectedIndex].text;
    const selectedModel = modelSelect.options[modelSelect.selectedIndex] ? modelSelect.options[modelSelect.selectedIndex].text : null;

    // Verifica se ambos os selects têm valores selecionados
    if (selectedBrand && selectedModel) {
        console.log(`Marca: ${selectedBrand}, Modelo: ${selectedModel}`);
    } else if (selectedBrand && !selectedModel) {
        console.log(`Marca: ${selectedBrand}, Nenhum modelo selecionado.`);
    } else {
        console.log('Por favor, selecione uma marca e um modelo.');
    }
});
