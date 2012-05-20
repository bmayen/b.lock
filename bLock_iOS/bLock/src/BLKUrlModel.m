//
//  BLKUrlModel.m
//  bLock
//
//  Created by Mario Gonzalez on 5/20/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "BLKUrlModel.h"
#import "Constants.h"

@implementation BLKUrlModel

-(NSString*) getURLForPath:(NSString*)aPath {
    
    NSString* returnString = [NSString stringWithFormat:@"%@://%@%@:%@/%@", kURLPrefixServerProtocol, kURLPrefixServerSubdomain, kURLPrefixServerDomain, kURLPrefixServerPort, aPath];
    NSLog( @"BLKUrlModel::getURLForPath - %@", returnString );
    return returnString;
}


#pragma mark Singleton Implementation
static BLKUrlModel* __instance = nil;
+(BLKUrlModel*) sharedInstance {
    if(__instance) return __instance;
    @synchronized( [BLKUrlModel class] ) {
        if(!__instance) {
            __instance = [[self alloc] init];
        }
        return __instance;
    }
    
    NSLog(@"Error creating CoreDataController singleton!");
    return nil;
}

+(void)end {
	__instance = nil;
};
@end
