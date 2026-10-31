# Podłączenie strony i n8n

Klucz ma postać `public_key_id.secret`. Trzymaj go po stronie serwera albo w poświadczeniach n8n. Nie umieszczaj go w kodzie formularza w przeglądarce.

Limit treści JSON to 256 KiB. Pliki idą osobnym uploadem. Przy błędzie przejściowym (503) i limicie (429) powtórz to samo żądanie z tym samym `Idempotency-Key`. Przy 409 nie ponawiaj tej samej treści pod nowym kluczem, jeśli `external_submission_id` już istnieje.

## curl

```bash
curl -sS -X POST "$APP_URL/api/v1/integrations/leads" \
  -H "Authorization: Bearer $INTEGRATION_TOKEN" \
  -H "Idempotency-Key: web-20261003-example-001" \
  -H "Content-Type: application/json" \
  -d @lead.example.json
```

Plik `lead.example.json` może mieć treść z przykładu w `docs/openapi.yaml`. To przykład dokumentacyjny, nie dane produkcyjne.

Zdarzenie oferty:

```bash
curl -sS -X POST "$APP_URL/api/v1/integrations/offer-events" \
  -H "Authorization: Bearer $INTEGRATION_TOKEN" \
  -H "Idempotency-Key: offer-event-example-001" \
  -H "Content-Type: application/json" \
  -d '{"external_event_id":"offer-event-example-001","external_submission_id":"web-20261003-example-001","external_offer_id":"offer-example-001","occurred_at":"2026-10-03T13:05:00+02:00","status":"sent","sent_at":"2026-10-03T13:05:00+02:00"}'
```

## n8n

Węzeł HTTP Request:

- Method: POST
- URL: `{{$env.APP_URL}}/api/v1/integrations/leads`
- Authentication: Generic Credential, Header Auth, nazwa `Authorization`, wartość `Bearer <token z poświadczenia>`
- Header: `Idempotency-Key` = identyfikator zgłoszenia
- Body: JSON z formularza
- Retry on fail: włączone dla 429 i 503, ten sam klucz idempotencji

CRM nie wysyła oferty e-mailem. Jeśli strona już wysłała ofertę, przekaż zdarzenie `sent` z datą. Zespół może też ręcznie potwierdzić wysyłkę w karcie tematu, gdy funkcja `confirm_offer_manually` zostanie wywołana z interfejsu administratora.

## Upload pliku

1. `POST /api/v1/integrations/documents/init` z `external_submission_id`, nazwą, typem i kategorią.
2. Wyślij plik na `upload.signedUrl` zwrócony w odpowiedzi. Nie pobieraj pliku z dowolnego adresu URL.
3. `POST /api/v1/integrations/documents/complete` z `storage_object_id`.

Dozwolone typy: PDF, JPEG, PNG, WebP, DOCX, XLSX. Domyślny limit to 25 MiB.
