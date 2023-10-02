import RatesRepositoryInterface from '../../domain/repositories/RatesRepositoryInterface';
import { Schema, Document, Model } from 'mongoose';
import { Rate } from 'src/rates/domain/models/entities/Rate';

export const RateSchema = new Schema<Rate>({
  pair: { type: String, required: true },
  originalRate: { type: Number, required: true },
  fee: { type: Number, required: true },
  feeAmount: { type: Number, required: true },
  rateWithMarkupFee: { type: Number, required: true },
});

export interface RateDTO extends Rate, Document {}

export default class RatesRepository implements RatesRepositoryInterface {
  private rateModel: Model<RateDTO>;

  constructor(rateModel: Model<RateDTO>) {
    this.rateModel = rateModel;
  }

  async getAll(): Promise<Array<Rate>> {
    const result = await this.rateModel.find();
    return result.map((rate) => {
      return {
        pair: rate.pair,
        originalRate: rate.originalRate,
        fee: rate.fee,
        feeAmount: rate.feeAmount,
        rateWithMarkupFee: rate.rateWithMarkupFee,
      };
    });
  }

  async create(payload: Rate): Promise<Rate> {
    await this.rateModel.create(payload);
    return payload;
  }
}
