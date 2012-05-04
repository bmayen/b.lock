//
//  BLKTimeLeftViewController.m
//  bLock
//
//  Created by Mario Gonzalez on 5/3/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "BLKTimeLeftViewController.h"

@interface BLKTimeLeftViewController ()
@end

@implementation BLKTimeLeftViewController
@synthesize asiHttpRequest;
@synthesize timeLeft, initialAmountOfTime;
@synthesize timeDisplay;

#define IP 192.168.43.144
#pragma mark - TIMER
-(void)starTimerWithInitialTimeOf:(double)anInitialAmountOfTime {
    timeLeft_ = initialAmountOfTime_ = anInitialAmountOfTime;
    [self createTimer];
}
-(void)stop {
    [timer_ invalidate];
    timeLeft = 0.0f;
}

-(void)pause {
    [timer_ invalidate];
}
-(void)resume {
    [self createTimer];
}

- (IBAction)onBackButtonWasPressed:(id)sender {
    [self.navigationController popViewControllerAnimated:YES];
    
    
}

- (IBAction)onWantsToExtendRide:(id)sender {
    timeLeft_ += 60 * 5;
    
    static int counter = 0;
    NSString* urlString = NULL;
    
    // Toggle
    if ( ++counter % 2 == 0 ) urlString = @"http://192.168.43.144:8666/rider/lock-value/set/1/true";
    else urlString = @"http://192.168.43.144:8666/rider/lock-value/set/1/false";
    
    [self setAsiHttpRequest: [ASIFormDataRequest requestWithURL:[NSURL URLWithString: urlString ]]];
	[asiHttpRequest setUseKeychainPersistence: YES];
	[asiHttpRequest setDelegate:self];
    [asiHttpRequest setRequestMethod:@"GET"];
	[asiHttpRequest setShouldPresentAuthenticationDialog:NO];
	[asiHttpRequest setDidFinishSelector:@selector(requestFinished:)];
	[asiHttpRequest setDidFailSelector:@selector(requestFailed:)];
    [asiHttpRequest setUseCookiePersistence:YES];
    [asiHttpRequest startAsynchronous];
}

- (IBAction)onWantsToLockupBike:(id)sender {
}

-(void)createTimer {
    timer_ = [NSTimer scheduledTimerWithTimeInterval:timerInteraval_ 
                                              target:self 
                                            selector:@selector(onTick:) 
                                            userInfo:nil 
                                             repeats:YES];
}

-(void)onTick:(NSTimer *)aTimer {
    timeLeft_ -= timerInteraval_;
    
    NSString* ss = @"";
    
    /*
     var hrs:String = (input > 3600 ? Math.floor(input / 3600) + ':' : '');
     */
    int hours = round( timeLeft_ / 3600 );
    if( hours < 10 ) ss = [ss stringByAppendingString: @"0"];
    ss = [ss stringByAppendingString:[NSString stringWithFormat:@"%i:", hours]];
    
    int min = fmod( timeLeft_, 3600) / 60.0f;
    if( min < 10 ) ss = [ss stringByAppendingString: @"0"];
    ss = [ss stringByAppendingString:[NSString stringWithFormat:@"%i:", min]];
    
    int sec = fmod( fmod( timeLeft_, 3600), 60 );
    if( sec < 10 ) ss = [ss stringByAppendingString: @"0"];
    ss = [ss stringByAppendingString:[NSString stringWithFormat:@"%i", sec]];
    
//    int micro = fmod( timeLeft_, (double)((int)timeLeft_) );
//    micro = round( micro * 1000 ) / 100;
//    if( micro < 10 ) ss = [ss stringByAppendingString: @"0"];
//    ss = [ss stringByAppendingString:[NSString stringWithFormat:@"%i", micro]];    
//    
    timeDisplay.text = ss;
}

#pragma mark ASIHTTPRequestDelegate
- (void)requestFinished:(ASIHTTPRequest *)request {
    
    NSString *responseString = [request responseString];
    
    // Append cookies    
    NSLog(@"Response StatusCode %i", asiHttpRequest.responseStatusCode);
    NSLog(@"Response Cookies %@", asiHttpRequest.responseCookies);
    NSLog(@"Response Headers %@", asiHttpRequest.responseHeaders);
    NSLog(@"--------------------:");  
    NSLog(@"%@", responseString);
}

- (void)requestFailed:(ASIHTTPRequest *)request {
    NSError *error = [request error];
    NSLog(@"Error %@", [error localizedDescription]);
}

- (void)viewDidLoad {
    // Custom initialization
    [super viewDidLoad];
    
    NSString* urlString = @"http://192.168.43.144:8666/rider/lock-value/set/1/false";

    [self setAsiHttpRequest: [ASIFormDataRequest requestWithURL:[NSURL URLWithString: urlString ]]];
	[asiHttpRequest setUseKeychainPersistence: YES];
	[asiHttpRequest setDelegate:self];
    [asiHttpRequest setRequestMethod:@"GET"];
	[asiHttpRequest setShouldPresentAuthenticationDialog:NO];
	[asiHttpRequest setDidFinishSelector:@selector(requestFinished:)];
	[asiHttpRequest setDidFailSelector:@selector(requestFailed:)];
    [asiHttpRequest setUseCookiePersistence:YES];
    [asiHttpRequest startAsynchronous];
    
	// Do any additional setup after loading the view.
    timerInteraval_ = 0.01;
    [self starTimerWithInitialTimeOf:10 * 60];
}

- (void)viewDidUnload {
    [self setTimeDisplay:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
