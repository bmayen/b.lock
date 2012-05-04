//
//  UnlockMapViewController.h
//  bLock
//
//  Created by Mario Gonzalez on 5/3/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FAFeedViewMapController.h"
#import "ASIHTTPRequest.h"
#import "ASIFormDataRequest.h"
#import "ASIHTTPRequestDelegate.h"

@interface BLKUnlockMapViewController : UIViewController <ASIHTTPRequestDelegate> {
    FAFeedViewMapController* mapviewController_;
}

@property(nonatomic, retain) ASIFormDataRequest* asiHttpRequest;
@property( strong, nonatomic) FAFeedViewMapController* mapviewController;
// OUTLETS
@property (weak, nonatomic) IBOutlet UIButton *unlockButton;
@property (weak, nonatomic) IBOutlet MKMapView *mapview;


- (IBAction)onBackButtonWasPressed:(id)sender;

-(void)setupMap;
@end
