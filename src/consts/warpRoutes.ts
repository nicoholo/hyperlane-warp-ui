import { WarpCoreConfig } from '@hyperlane-xyz/sdk';

// A list of Warp Route token configs
// These configs will be merged with the warp routes in the configured registry
// The input here is typically the output of the Hyperlane CLI warp deploy command
// or manually constructed for custom chains like wardenprotocol
export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    {
      // WARD on Warden Chain (source/origin, native/collateral style)
      chainName: 'wardenprotocol',
      standard: 'EvmHypNative',  // 原生 WARD，使用 EvmHypNative（或 EvmHypCollateral 如果是 wrapped ERC20）
      decimals: 18,
      symbol: 'WARD',
      name: 'Warden',
      addressOrDenom: '0xAB5159B5655CdAA5178C283853841aBB0D02Eef9',  // Warden Chain 上 WARD 的合约地址/denom
      connections: [
        {
          // 连接到 BSC 的 synthetic token
          token: 'bsc|0x6dc200b21894Af4660b549B678ea8df22BF7cfAc',
        },
      ],
    },
    {
      // WARD on BSC (synthetic/mirrored version)
      chainName: 'bsc',
      standard: 'EvmHypSynthetic',
      decimals: 18,
      symbol: 'WARD',
      name: 'Warden (from Warden)',
      addressOrDenom: '0x6dc200b21894Af4660b549B678ea8df22BF7cfAc',  // BSC 上合成 WARD 的合约地址
      connections: [
        {
          // 连接回 Warden 的 origin token
          token: 'wardenprotocol|0xAB5159B5655CdAA5178C283853841aBB0D02Eef9',
        },
      ],
    },
    // 如果有其他 token route（如 USDC 等），可以在这里继续添加
    // 示例：
    // {
    //   chainName: 'wardenprotocol',
    //   standard: 'EvmHypCollateral',
    //   decimals: 6,
    //   symbol: 'USDC',
    //   name: 'USDC on Warden',
    //   addressOrDenom: '0x...USDC地址在Warden上',
    //   connections: [{ token: 'bsc|0x...USDC在BSC上' }],
    // },
  ],
  options: {
    // 可选：全局选项，例如自定义 gas 限额、relayer 配置等
    // 示例：
    // interchainAccount: true,  // 如果用 ICA
    // defaultRpc: true,
  },
};
