# NestJS SSLCommerz Module

This is a NestJS module for integrating with the SSLCommerz payment gateway. It provides endpoints for initiating payments, handling payment notifications, and responding to payment success, failure, or cancellation events.

## Features

- Initiate SSLCommerz payment sessions
- Handle payment success, failure, and cancellation
- Process Instant Payment Notification (IPN)
- Easily configurable for sandbox or production environments

## Installation

Install the package using npm:

```bash
npm install nestjs-sslcommerz
```

Ensure you have the required dependencies:

```bash
npm install @nestjs/common @nestjs/config sslcommerz
```

## Configuration

Add the following environment variables to your `.env` file:

```env
PORT=3000
ROOT=http://localhost:3000
STORE_ID=your_store_id
STORE_PASSWORD=your_store_password
CLIENT_ROOT=http://localhost:4200
```

## Usage

### Import the Module

In your `AppModule`, import the `SslCommerzModule`:

```typescript
import { Module } from '@nestjs/common';
import { SslCommerzModule } from 'nestjs-sslcommerz';

@Module({
  imports: [SslCommerzModule],
})
export class AppModule {}
```

### Endpoints

The module exposes the following endpoints:

#### `GET /sslcommerz/`
- **Description**: Returns a welcome message and the SSLCommerz request URL.
- **Response**:
  ```json
  {
    "message": "Welcome to sslcommerz app",
    "url": "http://localhost:3000/sslcommerz/ssl-request"
  }
  ```

#### `POST /sslcommerz/ssl-request`
- **Description**: Initiates a payment session with SSLCommerz.
- **Body Parameters**:
  - `price`: Total amount for the transaction.
  - `name`: Product name.
- **Response**:
  - Success: Gateway URL for payment.
  - Failure: Error message.

#### `POST /sslcommerz/ssl-payment-notification`
- **Description**: Handles IPN from SSLCommerz.
- **Response**:
  ```json
  {
    "data": { ... },
    "message": "Payment notification"
  }
  ```

#### `POST /sslcommerz/ssl-payment-success`
- **Description**: Handles successful payments.
- **Behavior**: Redirects to the client success page.

#### `POST /sslcommerz/ssl-payment-fail`
- **Description**: Handles failed payments.
- **Behavior**: Redirects to the client failure page.

#### `POST /sslcommerz/ssl-payment-cancel`
- **Description**: Handles canceled payments.
- **Behavior**: Redirects to the client failure page.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

## Development

To compile the package:

```bash
npm run build
```

To test locally, use the example `.env` and configure a NestJS application to import the module.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue in the repository or contact the maintainer.

