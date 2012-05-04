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
@synthesize asiHttpRequest;

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
    

//    self.unlockButton.enabled = false;
    self.navigationController.navigationBar.hidden = YES;
    [self setupMap];
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
//        [self.mapviewController_ addAnnotation:self.businessAnnotation andShouldPreselect:YES withDisclosure:NO];
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
