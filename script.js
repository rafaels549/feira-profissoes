function typeText(text) {
    const display = document.getElementById('text-display');
    display.value = ''; 
    let index = 0;

    function type() {
        if (index < text.length) {
            display.value += text.charAt(index);
            index++;
            setTimeout(type, 100); 
        }
    }

    type();  
}

document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const inputValue = document.getElementById('inputField').value;
    const promptText = `quero saber mais sobre a profissão ${inputValue}`; // Adiciona a variável ao prompt

    try {
        const response = await fetch('https://feiradasprofissoesunitau.intelligentsystems.com.br/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'api-key': 'my_secret_api_key' 
            },
            body: JSON.stringify({ prompt: promptText }) 
        });

        if (response.ok) {
            const result = await response.json();

         
            if (result.response && result.response.trim() !== '') {
                typeText(result.response);
                console.log('Sucesso:', result);
            } else {
             
                typeText('Ainda não aprendi sobre essa profissão.');
                console.log('Profissão não encontrada');
            }
        } else {
            console.error('Erro ao enviar dados para a API');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
    }
});
