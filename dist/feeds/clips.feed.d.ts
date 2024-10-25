import { Feed } from '../core/feed';
import { ClipsFeedResponse, TimelineFeedResponseMedia_or_ad } from '../responses';
export declare class ClipsFeed extends Feed<ClipsFeedResponse, TimelineFeedResponseMedia_or_ad> {
  tag: string;
  private feedVariables;
  set state(body: any);
  request(): Promise<ClipsFeedResponse>;
  items(): Promise<TimelineFeedResponseMedia_or_ad[]>;
}
