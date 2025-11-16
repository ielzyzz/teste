// arquivo gerado automaticamente
{
  "name": "Order",
  "type": "object",
  "properties": {
    "customer_name": {
      "type": "string"
    },
    "customer_phone": {
      "type": "string"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "product_name": {
            "type": "string"
          },
          "size": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "toppings": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "sides": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      }
    },
    "total": {
      "type": "number"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ],
      "default": "pending"
    }
  },
  "required": [
    "items",
    "total"
  ]
}