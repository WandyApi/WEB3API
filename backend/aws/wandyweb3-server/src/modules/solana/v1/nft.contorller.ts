import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SolanaNFTService } from 'src/supplier/solana/solana.nft';

@ApiTags('Solana NFT')
@Controller('solana/nft/v1')
export class SolanaNFTController {
  constructor(private readonly solanaService: SolanaNFTService) {}
}
