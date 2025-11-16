// arquivo gerado automaticamente
{
  "name": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Nome do produto"
    },
    "slug": {
      "type": "string",
      "description": "URL-friendly identifier"
    },
    "category": {
      "type": "string",
      "enum": [
        "guarana",
        "combo"
      ],
      "description": "Categoria do produto"
    },
    "description": {
      "type": "string",
      "description": "Descri\u00e7\u00e3o do produto"
    },
    "image_url": {
      "type": "string",
      "description": "URL da imagem do produto"
    },
    "is_active": {
      "type": "boolean",
      "default": true,
      "description": "Produto dispon\u00edvel para venda"
    },
    "prices": {
      "type": "object",
      "description": "Pre\u00e7os por tamanho",
      "properties": {
        "250ml": {
          "type": "number"
        },
        "300ml": {
          "type": "number"
        },
        "400ml": {
          "type": "number"
        },
        "500ml": {
          "type": "number"
        }
      }
    },
    "available_sizes": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "250ml",
          "300ml",
          "400ml",
          "500ml"
        ]
      },
      "description": "Tamanhos dispon\u00edveis"
    }
  },
  "required": [
    "name",
    "category"
  ]
}