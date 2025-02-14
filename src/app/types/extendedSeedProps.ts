// types/ExtendedSeedProps.ts
import { ISeedProps } from 'react-brackets';

/** Describes a target position in the bracket. */
export interface IFlowPosition {
  roundId: number;    // Index of the target round in the appropriate rounds array
  matchId: number;    // Index of the target match (seed) in that round
  slotIndex: 0 | 1;   // Which team slot to fill (0 for top, 1 for bottom)
  bracket?: 'upper' | 'lower' | 'final'; // Which bracket to target
}

/**
 * Extends the default ISeedProps with explicit mapping data.
 */
export interface IExtendedSeedProps extends ISeedProps {
  winnerGoesTo?: IFlowPosition | null;
  loserGoesTo?: IFlowPosition | null;
}
