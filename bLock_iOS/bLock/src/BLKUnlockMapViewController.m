//
//  UnlockMapViewController.m
//  bLock
//
//  Created by Mario Gonzalez on 5/3/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "BLKUnlockMapViewController.h"




@implementation BLKUnlockMapViewController
@synthesize unlockButton;
@synthesize mapview;
@synthesize mapviewController;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView
{
}
*/

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString* urlString = @"http://192.168.43.144:8666/rider/0/get-active-bike";
    ASIFormDataRequest* asiHttpRequest = [ASIFormDataRequest requestWithURL:[NSURL URLWithString: urlString ]];
	[asiHttpRequest setUseKeychainPersistence: YES];
	[asiHttpRequest setDelegate:self];
    [asiHttpRequest setRequestMethod:@"GET"];
	[asiHttpRequest setShouldPresentAuthenticationDialog:NO];
	[asiHttpRequest setDidFinishSelector:@selector(requestFinished:)];
	[asiHttpRequest setDidFailSelector:@selector(requestFailed:)];
    [asiHttpRequest setUseCookiePersistence:YES];
    [asiHttpRequest startSynchronous];
    
    self.navigationController.navigationBar.hidden = YES;
    [self setupMap];
}

#pragma mark ASIHTTPRequestDelegate
- (void)requestFinished:(ASIHTTPRequest *)request {
    NSString *responseString = [request responseString];

    NSLog(@"---------------");
    NSLog(@"%@",responseString);

    // Convert NSString to number
    NSNumberFormatter * f = [[NSNumberFormatter alloc] init];
    [f setNumberStyle:NSNumberFormatterDecimalStyle];
    NSNumber * aNumber = [f numberFromString:responseString];
    bikeIndex_ = [aNumber intValue];
    
    
}

- (void)requestFailed:(ASIHTTPRequest *)request {
    NSError *error = [request error];
    NSLog(@"Error %@", [error localizedDescription]);
}

- (IBAction)onBackButtonWasPressed:(id)sender {
    [self.navigationController popViewControllerAnimated:YES];
}

-(void)setupMap {
    if( mapviewController_ == nil ) {
        
        self.mapviewController = [[FAFeedViewMapController alloc] initWithMapView:self.mapview];
        self.mapviewController.delegate = self;
        
//        [self.mapviewController setAllowScroll:YES andAllowZoom:YES];
        [self.mapviewController setMapSizeWidth:3300 andHeight:3300];
        [self.mapviewController setPinDelta:CGPointMake(0.003, -0.002)];

        // TODO: FAKE DATA
        BLKBikeAnnotation* aBikeAnnotation = [[BLKBikeAnnotation alloc] initWithTitle:@"Abike" andSubtitle: @"Here" andIndex: bikeIndex_];
            [self.mapviewController addAnnotation: aBikeAnnotation andShouldPreselect:YES withSubtitle:@"View Details" withDisclosure:YES];
    }
}

- (void)viewDidUnload
{
    [self setUnlockButton:nil];
    mapview = nil;
    [self setMapview:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


@end
