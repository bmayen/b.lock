//
//  FABusinessAnnotation.m
//  Freshly
//
//  Created by Mario Gonzalez on 1/6/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "BLKBikeAnnotation.h"
//#import "Businesses.h"
//#import "Posts.h"


@implementation BLKBikeAnnotation
@synthesize coordinate = _coordinate;
@synthesize title = _title;
@synthesize subtitle = _subtitle;
//@synthesize posts = _posts;
@synthesize showDisclosure = _showDisclosure;

-(id)initWithTitle:(NSString*)aTitle andSubtitle:(NSString*)aSubtitle {
    self = [super init];
    if(nil != self) {
//        self.posts = aPosts;
        self.title = @"Bike ID: AJ023";
        [self enableDisclosure];
        
        // TODO: DATASOURCE    
        NSArray *fakeset = [NSArray arrayWithObjects:
                            [NSArray arrayWithObjects: [NSNumber numberWithDouble:40.735226248609976], [NSNumber numberWithDouble:-73.99094581604004], nil],
                            [NSArray arrayWithObjects: [NSNumber numberWithDouble:40.76520144280567], [NSNumber numberWithDouble: -73.97953033447266], nil],
                            [NSArray arrayWithObjects: [NSNumber numberWithDouble:40.72501469240076], [NSNumber numberWithDouble: -73.98141860961914], nil],
                            [NSArray arrayWithObjects: [NSNumber numberWithDouble:40.71206913039633], [NSNumber numberWithDouble: -73.96425247192383], nil],
                            nil];
        
        NSUInteger randomIndex = arc4random() % [fakeset count];
        NSArray* fakeCoords = [fakeset objectAtIndex:randomIndex];
        
        self.coordinate = CLLocationCoordinate2DMake( [[fakeCoords objectAtIndex:0] doubleValue], [[fakeCoords objectAtIndex:1] doubleValue]);
    }
    
    return self;
}
- (void)dealloc {
    self.title = nil;
//    self.posts = nil;
}

-(void)enableDisclosure {
    _showDisclosure = YES;
}
-(void)hideDisclosure {
    _showDisclosure = NO;
}

@end
