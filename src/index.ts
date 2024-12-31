import { Module } from '@nestjs/common';
import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Request, Response } from 'express';
const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;

@Controller('sslcommerz')
export class SslCommerzController {
  @Get('/')
  async root(@Res() response: Response) {
    return response.status(200).json({
      message: 'Welcome to sslcommerz app',
      url: `${process.env.ROOT}/sslcommerz/ssl-request`,
    });
  }

  @Post('/ssl-request')
  async sslRequest(@Req() request: Request, @Res() response: Response) {
    const data = {
      total_amount: request.body.price,
      currency: 'BDT',
      tran_id: 'REF123', // Make it unique, it is dummy
      success_url: `${process.env.ROOT}/sslcommerz/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/sslcommerz/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/sslcommerz/ssl-payment-cancel`,
      shipping_method: 'No',
      product_name: request.body.name,
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'cust@yahoo.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D',
      ipn_url: `${process.env.ROOT}/sslcommerz/ssl-payment-notification`,
    };

    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false, // true for live, default false for sandbox
    );

    sslcommerz.init(data).then((data: any) => {
      if (data?.GatewayPageURL) {
        return response.status(200).json({ data: data?.GatewayPageURL });
      } else {
        return response.status(400).json({
          message: 'Session was not successful',
        });
      }
    });
  }

  @Post('/ssl-payment-notification')
  async sslPaymentNotification(@Req() request: Request, @Res() response: Response) {
    return response.status(200).json({
      data: request.body,
      message: 'Payment notification',
    });
  }

  @Post('/ssl-payment-success')
  async sslPaymentSuccess(@Req() request: Request, @Res() response: Response) {
    console.log('success response', request.body);
    return response.redirect(`${process.env.CLIENT_ROOT}/paymentSuccessful`);
  }

  @Post('/ssl-payment-fail')
  async sslPaymentFail(@Req() request: Request, @Res() response: Response) {
    console.log('fail response', request.body);
    return response.redirect(`${process.env.CLIENT_ROOT}/paymentFailure`);
  }

  @Post('/ssl-payment-cancel')
  async sslPaymentCancel(@Req() request: Request, @Res() response: Response) {
    console.log('cancel response', request.body);
    return response.redirect(`${process.env.CLIENT_ROOT}/paymentFailure`);
  }
}

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SslCommerzController],
})
export class SslCommerzModule {}

// Export the module and any necessary elements for external use
export { SslCommerzController, SslCommerzModule };
