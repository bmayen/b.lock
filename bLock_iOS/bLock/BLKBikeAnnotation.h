//
//  FABusinessAnnotation.h
//  Freshly
//
//  Created by Mario Gonzalez on 1/6/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <MapKit/MapKit.h>

//@class Posts;

@interface BLKBikeAnnotation : NSObject <MKAnnotation> {
    CLLocationCoordinate2D _coordinate;
    NSString* _title;
    NSString* _subtitle;
    BOOL _showDisclosure;
//    Posts* _posts;
}

@property(nonatomic, assign) CLLocationCoordinate2D coordinate;
@property(nonatomic, copy) NSString* title;
@property(nonatomic, copy) NSString* subtitle;
@property(nonatomic, readonly) BOOL showDisclosure;
//@property(nonatomic, retain) Posts *posts;


// Designated initalizer
//-(id)initWithPosts:(Posts*)aPosts;
-(id)initWithTitle:(NSString*)aTitle andSubtitle:(NSString*)aSubtitle;
-(void)enableDisclosure;
-(void)hideDisclosure;
@end
