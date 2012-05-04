//
//  BLKTimeLeftViewController.h
//  bLock
//
//  Created by Mario Gonzalez on 5/3/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ASIHTTPRequest.h"
#import "ASIFormDataRequest.h"
#import "ASIHTTPRequestDelegate.h"

@interface BLKTimeLeftViewController : UIViewController {
    NSTimer* timer_;
    double timerInteraval_;
    int timerCount_;
    // 
    double   timeLeft_;
    double   initialAmountOfTime_;
}

@property(nonatomic, retain) ASIFormDataRequest* asiHttpRequest;
@property(weak, nonatomic) IBOutlet UILabel *timeDisplay;

@property(readonly, nonatomic) double timeLeft;
@property(readonly, nonatomic) double initialAmountOfTime;

// TIMER
-(void)createTimer;
-(void)starTimerWithInitialTimeOf:(double)anInitialAmountOfTime;
-(void)onTick:(NSTimer *)aTimer;
-(void)stop;
-(void)pause;
-(void)resume;

- (IBAction)onBackButtonWasPressed:(id)sender;
- (IBAction)onWantsToExtendRide:(id)sender;
- (IBAction)onWantsToLockupBike:(id)sender;
@end
