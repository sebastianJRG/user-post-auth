import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import type { Response as ApiResponse } from 'src/response/response.interface';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception.getResponse() as { message: string[] };

    const body: ApiResponse = {
      success: false,
      data: null,
      error: {
        code: '400',
        message: Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message.join(', ')
          : exceptionResponse.message,
      },
    };

    response.status(400).json(body);
  }
}