import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json
import os
from pathlib import Path
from templateframework.metadata import Metadata
import time

visited_links = set()  # Conjunto para armazenar os links já visitados
broken_links = []  # Lista para armazenar os links quebrados

def run(metadata: Metadata = None):
    # Inicia o contador para calcular o tempo total de execução do script
    start_time = time.time()

    # Obtém o valor de max_depth e url_site dos computed inputs
    max_depth = int(metadata.computed_inputs['max_depth_value'])

    # recebe os valores "http://localhost:3000/ ou https://docs.stackspot.com"
    url_site = f"{metadata.computed_inputs['selected_site']}"  

    # Obtém o caminho da pasta "Documentos" de forma compatível com Windows, MacOS e Linux
    documents_dir = Path.home() / "Documents"

    # Cria a pasta "Documentos" se ela não existir
    documents_dir.mkdir(parents=True, exist_ok=True)
    print(f"Salvando arquivos na pasta Documentos: {documents_dir}")

    # Verifica os links do site
    check_site_links(url_site, 0, max_depth)

    # Salva os arquivos na pasta "Documentos"
    save_broken_links_to_file(documents_dir / 'broken_links.txt')
    save_broken_links_to_json(documents_dir / 'broken_links.json')
    save_broken_links_to_markdown(documents_dir / 'broken_links.md')

    # Calcula o tempo total de execução
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Tempo total de execução: {execution_time:.2f} segundos")

    # Exibe o caminho da pasta "Documentos"
    print(f"Arquivos salvos na pasta Documentos: {documents_dir}")

    return metadata  # Retorna o metadata para manter a compatibilidade

def is_valid_response(response):
    """Verifica se o código de status da resposta é 200 (OK)."""
    return response.status_code == 200

def fetch_page_content(url):
    """Busca o conteúdo da página e retorna o objeto de resposta."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Levanta uma exceção para códigos de status ruins
        return response
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Não foi possível acessar {url} - Exceção: {e}")
        return None

def extract_links(url, base_url):
    """Extrai e retorna todos os links únicos da URL fornecida."""
    response = fetch_page_content(url)
    if not response:
        return set()  # Retorna um conjunto vazio se a página não puder ser acessada

    soup = BeautifulSoup(response.text, 'html.parser')
    links = set()

    # Extrai todos os links da página
    for a_tag in soup.find_all('a', href=True):
        link = urljoin(base_url, a_tag['href'])  # Resolve links relativos
        parsed_link = urlparse(link)

        # Verifica se o link pertence ao mesmo domínio
        if parsed_link.netloc == urlparse(base_url).netloc:
            links.add(link)

    return links

def check_link(url):
    """Verifica se um link é acessível e imprime o resultado."""
    response = fetch_page_content(url)
    if response:
        if is_valid_response(response):
            print(f"[OK] {url}")
        else:
            print(f"[ERROR] {url} - Código de Status: {response.status_code}")
            broken_links.append(url)  # Adiciona o link à lista de links quebrados
    else:
        broken_links.append(url)  # Adiciona o link à lista de links quebrados

def check_site_links(url, depth, max_depth):
    """Verifica todos os links no site fornecido de forma recursiva, com limite de profundidade."""
    if depth > max_depth:
        print(f"[INFO] Profundidade máxima atingida em {url}")
        return  # Para a recursão se a profundidade máxima for atingida

    if url in visited_links:
        return  # Evita visitar o mesmo link mais de uma vez

    print(f"Verificando links em: {url} (Profundidade: {depth})")
    visited_links.add(url)  # Marca o link como visitado

    # Extrai todos os links da página atual
    links = extract_links(url, url)

    # Verifica cada link encontrado
    for link in links:
        check_link(link)  # Verifica se o link está quebrado

    # Chama a função recursivamente, aumentando a profundidade
    for link in links:
        check_site_links(link, depth + 1, max_depth)

def save_broken_links_to_file(output_file):
    """Salva os links quebrados em um arquivo de texto."""
    with open(output_file, 'w', encoding='utf-8') as file:
        if broken_links:
            file.write("Links quebrados encontrados:\n")
            for link in broken_links:
                file.write(f"{link}\n")
        else:
            file.write("Nenhum link quebrado encontrado.\n")

def save_broken_links_to_json(output_file):
    """Salva os links quebrados em um arquivo JSON."""
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump({"broken_links": broken_links}, file, indent=4)

def save_broken_links_to_markdown(output_file):
    """Salva os links quebrados em um arquivo Markdown."""
    with open(output_file, 'w', encoding='utf-8') as file:
        if broken_links:
            file.write("# Links Quebrados Encontrados\n")
            for link in broken_links:
                file.write(f"- {link}\n")
        else:
            file.write("# Nenhum link quebrado encontrado.\n")