import { ResolvedTheme } from './02-semanticResolver';

export interface AssetOutput {
  path: string;
  content: Buffer | string;
}

export function assetProcessor(theme: ResolvedTheme, allAssets: any[]): AssetOutput[] {
  // We tree-shake assets by looking at theme.usedAssetIds
  // For this Phase, since we don't have actual binary assets, we just return an empty array.
  return [];
}
