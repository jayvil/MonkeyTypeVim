export interface VimCommand {
  command: string;
  description: string;
  category: 'movement' | 'editing' | 'modes' | 'search';
}